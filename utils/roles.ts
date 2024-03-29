import { Role } from "../app/types/role";
import { ROLES } from "../constants/Roles";

export const filterInfluencerUid = (roles: Array<Role>) =>
    roles
        .filter(
            (role: Role) =>
                role.name === ROLES.user || role.name === ROLES.influencer
        )
        .map((role: Role) => role.uid);
