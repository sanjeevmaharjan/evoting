import {CandidateModel} from "./candidate.model";

export class IssueModel {
  id: number;
  name: string;
  description: string;
  numCandidates: number;
  candidates: CandidateModel[];
}
