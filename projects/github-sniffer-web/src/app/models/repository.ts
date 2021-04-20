export interface Label {
    id: string;
    name: string;
    checked_at?: string;
}

export interface User {
    id: string;
    login: string;
    avatar_url: string;
    url: string; g;
}

export interface Issue {
    html_url: string;
    title: string;
    created_at: string;
    updated_at: string;
    labels: Label[];
    user: User;
    id: string;
}

export interface Repository {
    repository_id: string;
    full_name: string;
    active_labels: Label[];
    issues: Issue[];
}
