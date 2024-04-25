import { INativeSearch } from "./BottomOptionsManager";
import DefaultVariableStorage from "./DefaultVariableStorage";
class FollowsClassStorage extends DefaultVariableStorage<INativeSearch[]> {
  LIMIT = 100;
  constructor() {
    super('follows', []);
  }

  isFollowed(id: string) {
    return this.memoryVariable.findIndex((item) => item.hi == id);
  }
  async pushOrRemove(item: INativeSearch): Promise<boolean> {
    const followindex = this.isFollowed(item.hi);
    const isfollow = followindex != -1;
    if (isfollow) {
      this.memoryVariable.splice(followindex, 1);
    } else {
      if (this.memoryVariable.length >= this.LIMIT) {
        return false;
      }
      this.memoryVariable.push(item);
    }
    this.setStorage(this.memoryVariable);
    return !isfollow;
  }
}

export const FollowsStorage = new FollowsClassStorage();
