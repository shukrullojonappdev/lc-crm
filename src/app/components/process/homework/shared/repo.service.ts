import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface GitTree {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size: number;
  url: string;
}

export interface Tree {
  key: string;
  label: string;
  data: string;
  icon: string;
  type: any | null;
  children: any[] | null;
}

@Injectable({
  providedIn: 'root'
})
export class RepoService {
  gitApiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getTree(payload: { user: string; repo: string; sha: string }) {
    return this.http.get<{ tree: GitTree[] }>(
      `${this.gitApiUrl}/repos/${payload.user}/${payload.repo}/git/trees/${payload.sha}`,
      { headers: { Anonymous: 'true' } }
    );
  }

  getBlob(payload: { user: string; repo: string; sha: string }) {
    return this.http.get<{ tree: GitTree[] }>(
      `${this.gitApiUrl}/repos/${payload.user}/${payload.repo}/git/blobs/${payload.sha}`,
      { headers: { Anonymous: 'true' } }
    );
  }
}
