import { $Enums, Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id?: string | undefined;
  username: string;
  name: string;
  surname: string;
  password: string;

  role?: $Enums.Role | undefined;
  status?: $Enums.Status | undefined;
  wallet?: Prisma.WalletCreateNestedOneWithoutUserInput | undefined;
  contact?: Prisma.ContactCreateNestedOneWithoutUserInput | undefined;
  settings?: Prisma.SettingsCreateNestedOneWithoutUserInput | undefined;

  branchId?: number | undefined;
  branch?: Prisma.BranchCreateNestedOneWithoutEmployeesInput | undefined;

  companyId?: number | undefined;
  company?: Prisma.CompanyCreateNestedOneWithoutEmployeesInput | undefined;

  campaigns?: Prisma.CampaignCreateNestedManyWithoutUserInput | undefined;
  favoritesBranches?:
    | Prisma.FavoriteBranchCreateNestedManyWithoutUserInput
    | undefined;
  favoritesProducts?:
    | Prisma.FavoriteProductCreateNestedManyWithoutUserInput
    | undefined;

  createdAt?: string | Date | undefined;
}
