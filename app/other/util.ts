/// <reference path="../../defs/phaser.d.ts"/>

export function DistanceSq(p1: Phaser.Math.Vector2, p2: Phaser.Math.Vector2) :number
{
    return Phaser.Math.Distance.Squared(p1.x, p1.y, p2.x, p2.y);
}