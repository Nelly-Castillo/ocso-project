import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ){}
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: string) {
    const provider =  this.providerRepository.findOneBy({
      providerId: id,
    })
    if(!provider) throw new NotFoundException()
    return provider;
  }

  async findOneByName(name: string) {
    // console.log(name);
    const providerN =  await this.providerRepository.findBy({
      providerName: Like(`%${name}%`),
    })
    if(!providerN) throw new NotFoundException()
    return providerN;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const providerUp =  await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto
    }) 
    if(!providerUp) throw new NotFoundException()
      this.providerRepository.save(providerUp);
    return providerUp;
  }

  remove(id: string) {
    this.findOne(id)
    this.providerRepository.delete({
      providerId: id,
    })
    return {
      message:  `Objeto con id: ${id} eliminado`
    }
  }
}
