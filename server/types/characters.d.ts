// Local Imports
import {
  AbilityRule,
  AbilityRuleReference,
} from './abilities';
import { PlayerAbilityRule } from './players';
import { NumericAbilityRule } from './primitives';

/**
 * Resolves to a character.
 */
export interface CharacterAbilityRule extends AbilityRule {
  type: 'character';
}

/**
 * Resolves to a character class.
 */
export interface CharacterClassAbilityRule extends AbilityRule {
  type: 'character-class';
}

/**
 * Resolves to a set character.
 */
export interface CharacterAbilityRuleValue extends CharacterAbilityRule {
  value: string;
}

/**
 * Resolves to a set character class.
 */
export interface CharacterClassAbilityRuleValue extends CharacterAbilityRule {
  value: string;
}

/**
 * Resolves to the character of a player.
 */
export interface CharacterOfAbilityRule extends CharacterAbilityRule {
  selector: 'character-of';

  /**
   * Who's character to resolve.
   */
  context: PlayerAbilityRule
    | AbilityRuleReference;
}

/**
 * Resolves to the story teller.
 */
export interface StoryTellerAbilityRuleValue extends CharacterAbilityRule {
  selector: 'story-teller';
}

/**
 * Resolves to a set of characters.
 */
export interface CharactersAbilityRule extends AbilityRule {
  type: 'character-list';
}

/**
 * Resolves to a set of characters.
 */
export interface CharactersInPlayAbilityRule extends AbilityRule {
  seledtor: 'in-play'
}

/**
 * Resolves to a set of characters.
 */
export interface CharactersUnusedAbilityRule extends AbilityRule {
  seledtor: 'unused'
}

/**
 * Resolves to a set of characters.
 */
export interface CharactersUsedAbilityRule extends AbilityRule {
  seledtor: 'used'
}

/**
 * Abstract character choice object.
 */
export interface ChooseCharacterAbilityRule extends CharacterAbilityRule {
  selector: 'choose' | 'choose-many';

  /**
   * Who chooses a character.
   */
  picker: CharacterAbilityRule;

  /**
   * Characters to choose from.
   */
  options: CharactersAbilityRule;

  /**
   * Is this public?
   */
  public: boolean;
}

/**
 * Resolves to a chosen character.
 */
export interface ChooseSingleCharacterAbilityRule extends ChooseCharacterAbilityRule {
  selector: 'choose';
}

/**
 * Resolves to a chosen character.
 */
export interface ChooseCharactersAbilityRule extends ChooseCharacterAbilityRule {
  selector: 'choose-many';

  /**
   * Number of characters to select.
   */
  count: NumericAbilityRule;
}
