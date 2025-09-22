export interface UpdateWritingType {
    contentVN : string;
    contentEN : string;
}

export interface createWritingType {
  learningUnitId : string;
  contentVN : string;
  contentEN : string;
}

export interface summitWritingType {
    userId: string;
    writingId: string;
    content: string;
    sentenceIndex: string;
    mode: boolean;
}