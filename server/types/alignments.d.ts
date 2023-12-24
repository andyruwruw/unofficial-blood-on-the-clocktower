// Local Imports
import {
  AbilityRule,
  AbilityRuleReference,
} from './abilities';
import { CharacterAlignment } from '.';
import { CharacterAbilityRule } from './characters';
import { PlayerAbilityRule } from './players';

/**
 * Resolves to an alignment.
 */
export interface AlignmentAbilityRule extends AbilityRule {
  type: 'alignment';
}

/**
 * Resolves to a set alignment.
 */
export interface AlignmentAbilityRuleValue extends AlignmentAbilityRule {
  value: CharacterAlignment;
}

/**
 * Resolves to the alignment of a player.
 */
export interface AlignmentOfAbilityRule extends AlignmentAbilityRule {
  selector: 'alignment-of';

  /**
   * Who's alignment to resolve.
   */
  context: PlayerAbilityRule
    | CharacterAbilityRule
    | AbilityRuleReference;
}
