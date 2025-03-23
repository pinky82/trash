import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { phone } })
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { phone: user.phone, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        avatar: user.avatar,
        isRecycler: user.isRecycler
      }
    }
  }

  async register(phone: string, password: string, name?: string) {
    const existingUser = await this.userRepository.findOne({ where: { phone } })
    if (existingUser) {
      throw new UnauthorizedException('手机号已注册')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = this.userRepository.create({
      phone,
      password: hashedPassword,
      name
    })

    await this.userRepository.save(user)
    const { password: _, ...result } = user
    return result
  }
} 