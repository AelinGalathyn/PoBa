import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/db.dtos';
import { PasswordService } from 'src/db/password.service';
import { DataSource, Repository } from 'typeorm';
import { map } from 'rxjs/operators';
import { parse } from 'fast-xml-parser/src/xmlparser/XMLParser.js';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private passwordService: PasswordService,
        private dataSource: DataSource,
        private readonly httpService: HttpService
    ) { }

    async regUser(username: string, password: string): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        const newUser = this.userRepository.create({ username, password });
        try {
            await queryRunner.manager.save(newUser);
            await queryRunner.commitTransaction();
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            await queryRunner.release();
        }
        return newUser;
    }


    async newAPI(apiKeyEncoded: string, userId: number): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        const user = await this.userRepository.findOne({ where: { userid: userId } });
        if (user) {
            try {
                await queryRunner.manager.update(User, { userid: userId }, { unas_api: apiKeyEncoded });

                await queryRunner.commitTransaction();
            }
            catch (e) {
                await queryRunner.rollbackTransaction();
                console.log(e.message);
            } finally {
                await queryRunner.release();
                console.log("Successful update!");
            }
        } else {
            throw new Error('User not found');
        }
    }

    async login(username: string, password: string) {
        const user = await this.userRepository.findOne({ where: { username: username } })
        const verified = await this.passwordService.verifyPassword(user.password, password);
        if (verified) {
            return user;
        }
        else {
            return null;
        }
    }

    async unasLogin(user: User){
        const apikey = user.unas_api;

        const params = new URLSearchParams({
            ApiKey: apikey,
            WebshopInfo: "true",
        }).toString();
        const headerRequest = {
            "Content-Value": "application/json",
        };

        const res = await this.httpService.post(`https://api.unas.eu/shop/login${params}`, {headerRequest}).pipe(
            map(response => response.data)).toPromise();

        const result = parse(res.data);
        const token = result.Login.token;
        return token;
    }
}
