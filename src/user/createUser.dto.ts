import { IsDefined, IsIn, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsDefined({ message: 'Name is required' })
  @Type(() => String)
  @IsString()
  name!: string;

  @IsDefined({ message: 'Email is required' })
  @Type(() => String)
  @IsString()
  email!: string;

  @IsDefined({ message: 'Role is required' })
  // @IsIn(['INVENTORY_MANAGER'], {
  //   message: 'Invalid role',
  // })
  role!: 'INVENTORY_MANAGER';

  @IsDefined({ message: 'Password is required' })
  @Type(() => String)
  @IsString()
  password!: string;
}
