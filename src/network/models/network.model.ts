import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Organization } from 'src/organization/models/organization.model';
import { StatusType } from 'src/organization/models/status-type.enum';

@ObjectType({ description: '网络' })
export class Network {
  @Field(() => ID, { description: 'name' })
  name: string;

  /** 所属联盟 */
  federation?: string;

  /** 创建时间 */
  creationTimestamp?: string;

  /** 更新时间 */
  lastHeartbeatTime?: string;

  /** 到期时间 */
  expiredTime?: string;

  /** 状态 */
  @Field(() => StatusType, { description: '状态' })
  status?: string;

  /** 引擎类型 */
  ordererType?: string;

  /** 我的节点数 */
  clusterSize?: number;

  @HideField()
  members?: Member[];

  /** 组织 */
  @Field(() => [Organization], { description: '网络中组织' })
  organizations?: Organization[];

  @HideField()
  initiatorName?: string;

  /** 发起者 */
  @Field(() => Organization, { description: '网络发起者（组织）' })
  initiator?: Organization;
}

@ObjectType({ description: '成员' })
class Member {
  /** 是否为发起者 */
  initiator?: boolean;

  /** name */
  name?: string;

  [k: string]: any;
}
