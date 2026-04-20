import { customerType } from "./customerType";
import { bookType } from "./bookType";
import { categoryType } from "./categoryType";
import { orderType } from "./orderType";
import { authorType } from "./authorType";
import { publisherType } from "./publisherType";
import { subjectType } from "./subjectType";

export const schema = {
  types: [customerType, bookType, categoryType, orderType, authorType, publisherType, subjectType],
}
