import { Component, OnInit } from '@angular/core';
import { EndpointsService } from "../../api/portainer/api/endpoints.service";
import { NgClass } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs";
import { environment } from "../../../environments/environment";

interface PortainerContainer {
  "Id": String;
  "Image": string;
  "State": string;
  "Status": string;
  "Names": string[];
}

const CONTAINER_RUNNING_STATE = "running";
const CONTAINER_EXITED_STATE = "exited";

interface PortainerDockerSnapshotRaw {
  "Containers": PortainerContainer[];
}

@Component({
  selector: 'app-portainer',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './portainer.component.html',
  styleUrl: './portainer.component.scss'
})
export class PortainerComponent implements OnInit {
  containers: PortainerContainer[] = [];

  constructor(
    private endpointsService: EndpointsService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    console.log("environment.API_KEY")
    console.log(environment.API_KEY)
    this.initContainers();
  }

  initContainers() {
    this.endpointsService.endpointList({})
      .subscribe((res) => {
        this.containers = res.flatMap(a => a.Snapshots?.flatMap(b => (b.DockerSnapshotRaw as PortainerDockerSnapshotRaw)?.Containers || [])) as PortainerContainer[];
      });
  }

  changeState(container: PortainerContainer): void {
    console.log(container.State)
    if (container.State === CONTAINER_RUNNING_STATE) {
      this.stopContainer(container);
    } else {
      this.startContainer(container);
    }
  }

  startContainer(container: PortainerContainer): void {
    this.httpClient.post("api/endpoints/2/docker/containers/" + container.Id + "/start", {}).subscribe(
      () => {
        this.initContainers();
      }
    );
  }

  stopContainer(container: PortainerContainer): void {
    this.httpClient.post("api/endpoints/2/docker/containers/" + container.Id + "/stop", {}).subscribe(
      () => {
        this.initContainers();
      }
    );
  }
}
