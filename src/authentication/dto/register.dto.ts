import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(5, 10)
  username: string;

  @IsString()
  @Length(5, 10)
  name: string;

  @IsString()
  @Length(5, 10)
  surname: string;

  @IsString()
  @Length(5, 10)
  password: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('TR')
  phone: string;
}
