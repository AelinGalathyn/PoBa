import { Injectable } from '@nestjs/common';
import { Status } from './status.entity';

@Injectable()
export class StatusService {
  async getStatuses(data: any[]) {
    let statuses: Status[]=[];
      const processData = (status: any) => {
        try {
          statuses.push({
            id: status.Id,
            name: status.Name,
          });
        } catch (err){
          throw new Error(`Error processing item ${status.Id}: ${err.message}`);
        }
      }

    if(Array.isArray(data)){
      data.forEach(processData);
    }
    else {
      processData(data);
    }

    return statuses;
  }
}
