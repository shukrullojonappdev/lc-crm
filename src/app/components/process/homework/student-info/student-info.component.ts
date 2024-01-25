import {
  AfterRenderPhase,
  Component,
  OnInit,
  ViewChild,
  afterNextRender
} from '@angular/core';
import { BreadcrumpService } from '../shared/breadcrump.service';
import { RepoService, Tree } from '../shared/repo.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.scss'
})
export class StudentInfoComponent implements OnInit {
  home: any;
  items: any[] = [];
  sidebarVisible = true;
  text = '';
  options = {
    debug: 'info',
    modules: {
      toolbar: '#toolbar'
    },
    placeholder: 'Compose an epic...',
    readOnly: true,
    theme: 'snow'
  };

  modules: {
    formula: false;
    toolbar: [['blockquote', 'code-block']];
    syntax: true;
  };
  formats: ['code-block', 'code'];

  data = {
    user: 'shukrullojondevnu',
    repo: 'lc-crm',
    sha: 'dev'
  };

  treeValue: Tree[] = [];

  constructor(
    private breadcrumpService: BreadcrumpService,
    private repoService: RepoService
  ) {}

  ngOnInit() {
    this.initBreadcrumb();
    this.repoService.getTree(this.data).subscribe((res) => {
      const sortedTree = this.sortResultTree(res.tree);
      sortedTree.forEach((e, i) => {
        this.treeValue.push({
          key: `${i}`,
          label: e.path,
          data: e.sha,
          type: e.type,
          icon: e.type === 'tree' ? 'pi pi-folder' : 'pi pi-file',
          children:
            e.type === 'tree'
              ? [
                  {
                    key: `${i}-0`,
                    label: '',
                    data: '',
                    icon: ''
                  }
                ]
              : null
        });
      });
    });
  }

  initBreadcrumb() {
    const { home, items } = this.breadcrumpService.getBreadcrumb();
    this.home = home;
    this.items = items;
  }

  sortResultTree(arr: any[]) {
    const sortedTree = arr.sort((a, b) => {
      if (a.type > b.type) {
        return -1;
      }
      if (a.type < b.type) {
        return 1;
      }
      return 0;
    });

    return sortedTree;
  }

  getNodeItems(e: any) {
    if (e.node.children[0].data === '') {
      this.repoService
        .getTree({ ...this.data, sha: e.node.data })
        .subscribe((res) => {
          const tempArr = [];
          const sortedTree = this.sortResultTree(res.tree);
          sortedTree.forEach((e, i) => {
            tempArr.push({
              key: `${i}`,
              label: e.path,
              data: e.sha,
              type: e.type,
              icon: e.type === 'tree' ? 'pi pi-folder' : 'pi pi-file',
              children:
                e.type === 'tree'
                  ? [
                      {
                        key: `${i}-0`,
                        label: '',
                        data: '',
                        icon: ''
                      }
                    ]
                  : null
            });
          });
          e.node.children = tempArr;
        });
    }
  }

  selectNode(e: any) {
    if (e.node.type === 'blob') {
      {
        this.repoService
          .getBlob({ ...this.data, sha: e.node.data })
          .subscribe((res: any) => {
            const tempText = atob(res.content);
            this.text = tempText;
          });
      }
    }
  }

  log(e: any) {
    console.log(e);
  }
}
