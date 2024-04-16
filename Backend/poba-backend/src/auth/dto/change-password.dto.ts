import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto{
  @IsNotEmpty()
  @IsString()
  @ApiProperty({example: 'lwjljq23je4', description: 'A felhasználó jelenlegi jelszava.'})
  opw: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({example: 'akmfvk23ekfc', description: 'A felhasználó új jelszava.'})
  npw: string;
}