import { basic as createBasic } from "./basics/basic";
import { first } from "./first";

(function () {
  const basic = createBasic();

  document.body.append(basic.canvas);

  first(basic);
})();
