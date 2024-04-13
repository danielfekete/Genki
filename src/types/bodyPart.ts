export interface BodyPart {
  id: string;
  name: string;
}
export interface FireBaseBodyPart extends Omit<BodyPart, 'id'> {}
