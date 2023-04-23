export type RepositoryUserType = 'User' | 'Organization';

export type RepositoryOwner = {
  readonly login: string;
  readonly id: number;
  readonly node_id: string;
  readonly avatar_url: string;
  readonly gravatar_id: string;
  readonly url: string;
  readonly html_url: string;
  readonly followers_url: string;
  readonly following_url: string;
  readonly gists_url: string;
  readonly starred_url: string;
  readonly subscriptions_url: string;
  readonly organizations_url: string;
  readonly repos_url: string;
  readonly events_url: string;
  readonly received_events_url: string;
  readonly type: RepositoryUserType;
  readonly site_admin: false;
};

export type Repository = {
  readonly id: number;
  readonly node_id: string;
  readonly name: string;
  readonly full_name: string;
  readonly private: false;
  readonly owner: RepositoryOwner;
  readonly html_url: string;
  readonly description: string;
  readonly fork: false;
  readonly url: string;
  readonly forks_url: string;
  readonly keys_url: string;
  readonly collaborators_url: string;
  readonly teams_url: string;
  readonly hooks_url: string;
  readonly issue_events_url: string;
  readonly events_url: string;
  readonly assignees_url: string;
  readonly branches_url: string;
  readonly tags_url: string;
  readonly blobs_url: string;
  readonly git_tags_url: string;
  readonly git_refs_url: string;
  readonly trees_url: string;
  readonly statuses_url: string;
  readonly languages_url: string;
  readonly stargazers_url: string;
  readonly contributors_url: string;
  readonly subscribers_url: string;
  readonly subscription_url: string;
  readonly commits_url: string;
  readonly git_commits_url: string;
  readonly comments_url: string;
  readonly issue_comment_url: string;
  readonly contents_url: string;
  readonly compare_url: string;
  readonly merges_url: string;
  readonly archive_url: string;
  readonly downloads_url: string;
  readonly issues_url: string;
  readonly pulls_url: string;
  readonly milestones_url: string;
  readonly notifications_url: string;
  readonly labels_url: string;
  readonly releases_url: string;
  readonly deployments_url: string;
};

export type FavoriteRepo = Pick<
  Repository,
  'id' | 'full_name' | 'description' | 'html_url'
> & { starredDate: string };
