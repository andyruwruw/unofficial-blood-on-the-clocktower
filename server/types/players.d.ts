// Local Imports
import {
  AbilityRuleValueDirection,
  BooleanAbilityRule,
  NumericAbilityRule,
} from './primitives';
import {
  AbilityRule,
  AbilityRuleReference,
} from './abilities';
import { CharacterAbilityRule } from './characters';

/**
 * Resolves to a player.
 */
export interface PlayerAbilityRule extends AbilityRule {
  type: 'player';
}

/**
 * Resolves to a set of players.
 */
export interface PlayersAbilityRule extends AbilityRule {
  type: 'player-list';
}

/**
 * Resolves to a set player.
 */
export interface PlayerAbilityRuleValue extends PlayerAbilityRule {
  value: string;
}

/**
 * Resolves to the player this rule is about.
 */
export interface SelfAbilityRule extends PlayerAbilityRule {
  selector: 'self';
}

/**
 * Resolves to a random player.
 */
export interface RandomPlayerAbilityRuleValue extends PlayerAbilityRule {
  selector: 'random';
}

/**
 * Resolves to a list of all players.
 */
export interface AllPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all';
}

/**
 * Resolves to a list of all living players.
 */
export interface AllLivingPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all-living';
}

/**
 * Resolves to a list of all dead players.
 */
export interface AllDeadPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all-dead';
}

/**
 * Resolves to a list of all good players.
 */
export interface AllGoodPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all-good';
}

/**
 * Resolves to a list of all evil players.
 */
export interface AllEvilPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all-evil';
}

/**
 * Resolves to a list of all neutral players.
 */
export interface AllNeutralPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all-neutral';
}

/**
 * Resolves to a list of all townsfolk players.
 */
export interface AllTownsfolkPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all-townsfolk';
}

/**
 * Resolves to a list of all outsider players.
 */
export interface AllOutsiderPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all-outsiders';
}

/**
 * Resolves to a list of all minion players.
 */
export interface AllMinionPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all-minions';
}

/**
 * Resolves to a list of all demon players.
 */
export interface AllDemonPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'all-demons';
}

/**
 * Resolves to the player to the left or right of the player this rule is about.
 */
export interface AdjacentPlayerAbilityRuleValue extends PlayerAbilityRule {
  selector: 'adjacent';

  /**
   * Player to look around.
   */
  center: PlayerAbilityRule;

  /**
   * How many players around.
   */
  distance: number;

  /**
   * Direction to seek.
   */
  direction: AbilityRuleValueDirection;
}

/**
 * Resolves to players to the left or right of the player this rule is about.
 */
export interface AdjacentPlayersAbilityRuleValue extends PlayersAbilityRule {
  selector: 'adjacents';

  /**
   * Player to look around.
   */
  center: PlayerAbilityRule;

  /**
   * How many players around.
   */
  distance: NumericAbilityRule;

  /**
   * Direction to seek.
   */
  direction: AbilityRuleValueDirection;
}

/**
 * Abstract player choice object.
 */
export interface ChoosePlayerAbilityRule extends PlayerAbilityRule {
  selector: 'choose' | 'choose-many';

  /**
   * Who chooses a player.
   */
  picker: PlayerAbilityRule;

  /**
   * Players to choose from.
   */
  options: PlayersAbilityRule;

  /**
   * Is this public?
   */
  public: BooleanAbilityRule;
}

/**
 * Resolves to a chosen player.
 */
export interface ChooseSinglePlayerAbilityRule extends ChoosePlayerAbilityRule {
  selector: 'choose';
}

/**
 * Resolves to a chosen player.
 */
export interface ChoosePlayersAbilityRule extends ChoosePlayerAbilityRule {
  selector: 'choose-many';

  /**
   * Number of players to select.
   */
  count: NumericAbilityRule;
}

/**
 * Resolves the closest player from a list of players, to a given player.
 */
export interface ClosestPlayerAbilityRule extends PlayerAbilityRule {
  selector: 'closest';

  /**
   * Player to be measured from.
   */
  center: PlayerAbilityRule;

  /**
   * List of players to measure to.
   */
  others: PlayersAbilityRule;
}

/**
 * Specifies a given player, but adds doubt with other selected players.
 */
export interface PlayerAddFalseAbilityRuleValue extends PlayerAbilityRule {
  selector: 'add-false';

  /**
   * Player this rule is intended to be about.
   */
  focus: PlayerAbilityRule;

  /**
   * Added players for doubt.
   */
  distraction: PlayersAbilityRule | PlayerAbilityRule;
}

/**
 * Booleans about a player's status.
 */
export interface PlayerQueryAbilityRule extends BooleanAbilityRule {
  /**
   * Context to which to derive the answer.
   */
  context: PlayerAbilityRule
    | CharacterAbilityRule
    | AbilityRuleReference;
}

/**
 * Whether a player or character is a townsfolk.
 */
export interface IsTownsfolkAbilityRule extends PlayerQueryAbilityRule {
  query: 'is-townsfolk';
}

/**
 * Whether a player or character is an outsider.
 */
export interface IsOutsiderAbilityRule extends PlayerQueryAbilityRule {
  query: 'is-outsider';
}

/**
 * Whether a player or character is a minion.
 */
export interface IsMinionAbilityRule extends PlayerQueryAbilityRule {
  query: 'is-minion';
}

/**
 * Whether a player or character is a demon.
 */
export interface IsDemonAbilityRule extends PlayerQueryAbilityRule {
  query: 'is-demon';
}

/**
 * Whether a player or character is a fabled.
 */
export interface IsFabledAbilityRule extends PlayerQueryAbilityRule {
  query: 'is-fabled';
}

/**
 * Whether a player or character is a traveler.
 */
export interface IsTravelerAbilityRule extends PlayerQueryAbilityRule {
  query: 'is-traveler';
}

/**
 * Whether a player or character is good.
 */
export interface IsGoodAbilityRule extends PlayerQueryAbilityRule {
  query: 'is-good';
}

/**
 * Whether a player or character is evil.
 */
export interface IsEvilAbilityRule extends PlayerQueryAbilityRule {
  query: 'is-evil';
}

/**
 * Whether a player or character is neutral.
 */
export interface IsNeutralAbilityRule extends PlayerQueryAbilityRule {
  query: 'is-neutral';
}

/**
 * Whether a player is dead.
 */
export interface IsDead extends PlayerQueryAbilityRule {
  query: 'is-dead';
}

/**
 * Whether a player is drunk.
 */
export interface IsDrunk extends PlayerQueryAbilityRule {
  query: 'is-drunk';
}

/**
 * Whether a player is poisoned.
 */
export interface IsPoisoned extends PlayerQueryAbilityRule {
  query: 'is-poisoned';
}

/**
 * Whether a player is mad.
 */
export interface IsMad extends PlayerQueryAbilityRule {
  query: 'is-mad';
}

/**
 * Resolves to the number of steps between two players.
 */
export interface StepsTowardsAbilityRule extends NumericAbilityRule {
  operator: 'steps-towards';

  /**
   * Player to measure from.
   */
  start: PlayerAbilityRule;

  /**
   * Player to measure to.
   */
  end: PlayerAbilityRule;
}
