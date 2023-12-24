/**
 * Character alignments.
 */
export type CharacterAlignment = 'good' | 'evil' | 'neutral';

/**
 * Character category.
 */
export type CharacterCategory = 'townsfolk' | 'outsider' | 'minion' | 'demon' | 'traveler' | 'fabled';

/**
 * Character object type.
 */
export interface Character {
  /**
   * Unique key for this character.
   */
  key: string;

  /**
   * Name of this character.
   */
  name: string;

  /**
   * Brief dscription of this character.
   */
  description: string;

  /**
   * Character's display icon identifier.
   */
  icon: string;

  /**
   * Character's alignment (good / evil / neutral)
   */
  alignment: CharacterAlignment;

  /**
   * Character's category (townsfolk / outsider / minion / demon / traveler / fabled)
   */
  category: CharacterCategory;

  /**
   * Character's ability rules.
   */
  rules: AbilityRule[];
}

/**
 * Unique keys for scripts.
 */
export type GameScriptKey = 'trouble-brewing' | 'bad-moon-rising' | 'sects-and-violets' | 'fabled' | 'extra' | 'custom';

export interface GameScript {
  /**
   * Unique key for this script.
   */
  key: GameScriptKey;

  /**
   * Name of this script.
   */
  name: string;

  /**
   * Difficulty estimation of this script.
   */
  difficulty: number;

  /**
   * Brief description of this script.
   */
  description: string;

  /**
   * Icon for the script.
   */
  icon: string;
}

export interface CharacterScript {
  character: string;

  script: GameScript;
}

export interface CharacterAbility {
  character: string;

  ability: string;
}

export interface Ability {
  key: string;

  name: string;

  rules: AbilityRule[];
}

export interface BackgroundMusic {
  key: string;

  uri: string;

  timestamp: number;

  duration: number;
}

export interface SoundEffect {
  key: string;

  path: string;

  duration: number;
}
