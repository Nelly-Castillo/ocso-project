import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}
  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    return this.managerRepository.find();
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOneBy({
      managerId: id,
    });
    if(!manager) throw new NotFoundException("Manager not found");
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerUp = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto
    });
    if(!managerUp) throw new NotFoundException("Manager not found");
    return this.managerRepository.save(managerUp);
  }

  remove(id: string) {
    return this.managerRepository.delete({
      managerId: id
    });
  }
}
