// Local Imports
import { AbilityRuleBlock } from './controls';
import { CharacterAbility } from '.';
import { CharacterClassAbilityRule } from './characters';
import { NumericAbilityRule } from './primitives';

/**
 * Stipulations on what a character requires to be present or set-up changes they make.
 */
export interface RequiresAbilityRule extends AbilityRuleBlock {
  type: 'requires';
}

/**
 * Allows a character to influence the amount of characters per each class.
 */
export interface ClassCountModifierAbilityRule extends RequiresAbilityRule {
  modification: 'class-count';

  /**
   * Class to adjust.
   */
  class: CharacterClassAbilityRule;

  /**
   * The amount to alter the count.
   */
  count: NumericAbilityRule;
}

/**
 * Allows a character to influence the amount of characters per each class.
 */
export interface BestFriendAbilityRule extends RequiresAbilityRule {
  modification: 'accompaniment';

  /**
   * Class to adjust.
   */
  character: CharacterAbility;

  /**
   * The amount to alter the count.
   */
  count: NumericAbilityRule;
}
