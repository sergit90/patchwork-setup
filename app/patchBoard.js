import { PATCH_IDS, TINY_PATCH_ID } from "./constants.js";
import { dom } from "./dom.js";
import { shuffleArray } from "./utils.js";

class PatchBoard {
  constructor() {
    this.availablePatchIds = [];
    this.selectedPatchIndex = null;
    this.chosenPatchIds = [];
  }

  updatePassButtonState(isEnabled) {
    dom.passButton.classList.toggle("disabled", !isEnabled);
  }

  highlightSelection(index) {
    if (this.selectedPatchIndex !== null) {
      dom.board.children[this.selectedPatchIndex].firstChild.classList.remove(
        "selected"
      );
    }

    this.selectedPatchIndex = index;

    dom.board.children[this.selectedPatchIndex].firstChild.classList.add(
      "selected"
    );

    this.updatePassButtonState(true);
  }

  handlePass() {
    if (this.selectedPatchIndex === null) return;

    const chosenId = this.availablePatchIds[this.selectedPatchIndex];
    this.chosenPatchIds.push(chosenId);
    this.availablePatchIds = [
      ...this.availablePatchIds.slice(this.selectedPatchIndex + 1),
      ...this.availablePatchIds.slice(0, this.selectedPatchIndex),
    ];
    this.selectedPatchIndex = null;
    this.updatePassButtonState(false);
    this.renderBoard();
  }

  createPatchElement(patchId, positionIndex) {
    const container = document.createElement("div");
    container.className = "gap";

    const image = document.createElement("img");
    image.id = patchId;
    image.src = `./assets/img/${patchId}.webp`;
    image.alt = "Patch";

    if (positionIndex < 3) {
      image.className = "choices";
      image.addEventListener("click", () =>
        this.highlightSelection(positionIndex)
      );
    }

    container.appendChild(image);

    return container;
  }

  renderBoard() {
    dom.board.innerHTML = "";

    this.availablePatchIds.forEach((patchId, positionIndex) => {
      dom.board.appendChild(this.createPatchElement(patchId, positionIndex));
    });
  }

  init() {
    this.availablePatchIds = shuffleArray(PATCH_IDS);
    this.availablePatchIds.push(TINY_PATCH_ID);

    dom.passButton.addEventListener("click", () => this.handlePass());

    this.updatePassButtonState(false);
    this.renderBoard();

    window.addEventListener("beforeunload", () => "Refresh");
  }
}

export default PatchBoard;
