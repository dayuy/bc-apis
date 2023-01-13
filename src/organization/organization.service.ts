import { Injectable, Logger } from '@nestjs/common';
import { KubernetesService } from 'src/kubernetes/kubernetes.service';
import { CRD } from 'src/kubernetes/lib';
import { JwtAuth } from 'src/types';
import { NewOrganizationInput } from './dto/new-organization.input';
import { UpdateOrganization } from './dto/update-organization.input';
import { Organization } from './models/organization.model';

@Injectable()
export class OrganizationService {
  constructor(private readonly k8sService: KubernetesService) {}

  logger = new Logger('OrganizationService');

  format(org: CRD.Organization): Organization {
    return {
      name: org.metadata.name,
      displayName: org.spec?.displayName,
      description: org.spec?.description,
      creationTimestamp: new Date(
        org.metadata?.creationTimestamp,
      ).toISOString(),
      lastHeartbeatTime: org.status?.lastHeartbeatTime
        ? new Date(org.status?.lastHeartbeatTime).toISOString()
        : null,
      admin: org.spec?.admin,
      status: org.status?.type,
      reason: org.status?.reason,
      clients: org.spec?.clients,
    };
  }

  async getOrganizations(
    auth: JwtAuth,
    admin?: string,
  ): Promise<Organization[]> {
    const labelSelector = [];
    if (admin) {
      labelSelector.push(`bestchains.organization.admin=${admin}`);
    }
    const k8s = await this.k8sService.getClient(auth);
    const { body: orgs } = await k8s.organization.list({
      labelSelector: labelSelector.join(','),
    });
    return orgs.items.map((org) => this.format(org));
  }

  async getOrganization(auth: JwtAuth, name: string): Promise<Organization> {
    const k8s = await this.k8sService.getClient(auth);
    const { body } = await k8s.organization.read(name);
    return this.format(body);
  }

  async createOrganization(
    auth: JwtAuth,
    org: NewOrganizationInput,
  ): Promise<Organization> {
    const { name, displayName, description } = org;
    const { preferred_username } = auth;
    const k8s = await this.k8sService.getClient(auth);
    const { body } = await k8s.organization.create({
      metadata: {
        name,
      },
      spec: {
        admin: preferred_username,
        displayName,
        description,
        license: {
          accept: true,
        },
        caSpec: {
          version: '1.5.5',
          license: {
            accept: true,
          },
          images: {
            caImage: 'hyperledgerk8s/fabric-ca',
            caTag: '1.5.5-iam',
            caInitImage: 'hyperledgerk8s/ubi-minimal',
            caInitTag: 'latest',
          },
          resources: {
            ca: {
              limits: {
                cpu: '100m',
                memory: '200M',
              },
              requests: {
                cpu: '10m',
                memory: '10M',
              },
            },
            init: {
              limits: {
                cpu: '100m',
                memory: '200M',
              },
              requests: {
                cpu: '10m',
                memory: '10M',
              },
            },
          },
          storage: {
            ca: {
              class: 'standard',
              size: '100M',
            },
          },
        },
      },
    });
    return this.format(body);
  }

  // TODO: 增加权限校验（只有组织管理员才能patch/update）
  async updateOrganization(
    auth: JwtAuth,
    name: string,
    org: UpdateOrganization,
  ): Promise<Organization> {
    const { users, admin } = org;
    const k8s = await this.k8sService.getClient(auth);
    const { body } = await k8s.organization.patchMerge(name, {
      spec: {
        clients: users,
        admin,
      },
    });
    return this.format(body);
  }
}