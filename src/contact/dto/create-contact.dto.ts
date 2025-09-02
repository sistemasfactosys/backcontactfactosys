import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class ContactDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  company?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['web-development', 'mobile-app', 'ecommerce', 'consulting', 'other'])
  service: string;

  @IsOptional()
  @IsString()
  @IsIn(['1000-5000', '5000-10000', '10000-25000', '25000+'])
  budget?: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 1000)
  message: string;
}
