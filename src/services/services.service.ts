import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(Service) private readonly repository: Repository<Service>) {}
  
  create(createServiceDto: CreateServiceDto) {
    return this.repository.save(createServiceDto);
  }

  findAll(search: string) {
    const filter = {};
    
    if(search) {
      filter['name'] = ILike(`%${search}%`) 
    }
    
    return this.repository.find({
      where: filter
    })
  }

  findOne(id: string) {
    return this.repository.findOne({ where: {
      id
    }});
  }

  update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.repository.update(id, updateServiceDto);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
