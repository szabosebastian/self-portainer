import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './api/auth.service';
import { BackupService } from './api/backup.service';
import { CustomTemplatesService } from './api/custom-templates.service';
import { DockerService } from './api/docker.service';
import { EdgeService } from './api/edge.service';
import { EdgeGroupsService } from './api/edge-groups.service';
import { EdgeJobsService } from './api/edge-jobs.service';
import { EdgeStacksService } from './api/edge-stacks.service';
import { EdgeTemplatesService } from './api/edge-templates.service';
import { EndpointGroupsService } from './api/endpoint-groups.service';
import { EndpointsService } from './api/endpoints.service';
import { GitopsService } from './api/gitops.service';
import { HelmService } from './api/helm.service';
import { IntelService } from './api/intel.service';
import { KubernetesService } from './api/kubernetes.service';
import { LdapService } from './api/ldap.service';
import { MotdService } from './api/motd.service';
import { RbacEnabledService } from './api/rbac-enabled.service';
import { RegistriesService } from './api/registries.service';
import { ResourceControlsService } from './api/resource-controls.service';
import { RolesService } from './api/roles.service';
import { SettingsService } from './api/settings.service';
import { SslService } from './api/ssl.service';
import { StacksService } from './api/stacks.service';
import { StatusService } from './api/status.service';
import { SystemService } from './api/system.service';
import { TagsService } from './api/tags.service';
import { TeamMembershipsService } from './api/team-memberships.service';
import { TeamsService } from './api/teams.service';
import { TemplatesService } from './api/templates.service';
import { UploadService } from './api/upload.service';
import { UsersService } from './api/users.service';
import { WebhooksService } from './api/webhooks.service';
import { WebsocketService } from './api/websocket.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
