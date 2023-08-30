export interface Question {
    data_points?: string[];
    prompt?: string;
    question_id?: string;
    related_questions?: string[];
    session_id?: boolean;
    thoughts?: string;
}