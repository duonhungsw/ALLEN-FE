export interface UpdateWritingType {
  contentVN: string;
  contentEN: string;
}

export interface createWritingType {
  learningUnitId: string;
  contentVN: string;
  contentEN: string;
}

export interface summitWritingType {
  writingId: string;
  content: string;
  sentenceIndex: string;
  mode: boolean;
}

export interface summitWritingStreamType {
  writingId: string;
  content: string;
  sentenceIndex: number;
  mode: number;
}

export interface WritingSubmitResponse {
  highlighted?: string;
  accuracy?: number;
  message?: string;
  corrected?: string;
  suggested?: string;
  comments?: string;
  point?: number;
  isCorrect?: boolean;
}