import { InjectionToken } from '@angular/core';
/**
 * @author - Shahbaz Shaikh
 * @description - This file consists of the class that will be used to set the configurations for the badge component
 */

/**
 * @name BadgeConfiguration
 * @property badgeColor
 * @property badgeStyle
 * @property badgeType
 * @property badgeSize
 * @property isDisable
 */
export class BadgeConfiguration {
    color?: BadgeColor;
    style?: BadgeStyle;
    type?: BadgeType;
    size?: BadgeSize;
    isDisable?: boolean;

    constructor(
        badgeColor: BadgeColor = BadgeColor.Primary,
        badgeStyle: BadgeStyle = BadgeStyle.Solid,
        badgeType: BadgeType = BadgeType.Rectangle,
        badgeSize: BadgeSize = BadgeSize.Medium,
        disable: boolean = false
    ) {
        this.color = badgeColor;
        this.style = badgeStyle;
        this.type = badgeType;
        this.size = badgeSize;
        this.isDisable = false;
    }
}

/**
 * @description Enum is used to create of different type of set badge color.
 * @property Primary
 * @property Success
 * @property Info
 * @property Warning
 * @property Danger
 * @property Light
 * @property Inverse
 */
export enum BadgeColor {
    Primary = 'badge-primary',
    Success = 'badge-success',
    Info = 'badge-info',
    Warning = 'badge-warning',
    Danger = 'badge-danger',
    Light = 'badge-link',
    Inverse = 'badge-dark'
}

/**
 * @description Enum is used to create of different type of badge style.
 * @property Flat
 * @property Solid
 * @property Elevated
 * @property Outline
 */
export enum BadgeStyle {
    Flat = 'Elevated',
    Solid = 'Elevated',
    Elevated = 'Elevated',
    Outline = 'Outline'
}

/**
 * @description Enum is used to create of different type of badge type.
 * @property Rounded
 * @property Circle
 * @property Rectangle
 * @property RoundedRectangle
 */
export enum BadgeType {
    Rounded = 'Rounded',
    Circle = 'Circle',
    Rectangle = 'Rectangle',
    RoundedRectangle = 'RoundedRectangle'
}

export enum BadgeTextSize {
    badgeSize = 'initial',
}

/**
 * @description Enum is used to create of diffrent type of set badge size.
 * @property Miny
 * @property Tiny
 * @property Small
 * @property Medium
 * @property Large
 * @property Big
 * @property Huge
 * @property Massive
 */
export enum BadgeSize {
    Miny = '',
    Tiny = '',
    Small = '',
    Medium = '',
    Large = '',
    Big = '',
    Huge = '',
    Massive = ''
}

/**
 * @description Enum is used to create a set the badge position
 */
export enum BadgePosition {
    left = '',
    right = ''
}
/**
 * @description injection token for the developer to be used to create provider for custom configuration at the global level.
 */
export const Global_BADGE_CONFIGURATION = new InjectionToken<BadgeConfiguration>('BadgeConfiguration');
