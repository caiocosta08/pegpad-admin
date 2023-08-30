export interface CreateArticleParams {
    question?: string;
    answer?: string;
    author?: string | 'copilot';
    tags?: string[];
    visibility_tags?: string[];
    // temporary
    id?: string | null;
    created_at?: string | Date | null;
    published_at?: string | Date | null;
    published?: boolean | null;
    divergence?: string | null;
    divergence_reason?: string | null;
    responsible?: string | null;
    category?: string | null;
    version?: string | null;
    status?: string | null;

}