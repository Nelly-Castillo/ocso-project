import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as  jwt  from 'jsonwebtoken';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)  
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ){}
  registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5)
    // console.log(createUserDto)
    return this.userRepository.save(createUserDto)
  }
  async loginUser(loginUserDto:LoginUserDto){
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail
      }
    })
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    console.log(user)
    const match =  await bcrypt.compare(loginUserDto.userPassword, user.userPassword)
    console.log(match);
    if (!match) {
      throw new  UnauthorizedException ("No estas autorizado");
    }
    const payload = {
      user: user.userEmail,
      password: user.userPassword,
    };
    const token = this.jwtService.sign(payload);
    return token;
    // const token = jwt.sign(JSON.stringify(user),"SECRET KEY");
    // return token;
    // return 'Inicio de sesion exitoso';
  }
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
