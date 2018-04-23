/// <reference path="../../defs/phaser.d.ts"/>

export function DistanceSq(p1: Phaser.Math.Vector2, p2: Phaser.Math.Vector2) :number
{
    return Phaser.Math.Distance.Squared(p1.x, p1.y, p2.x, p2.y);
}

export function DistanceSq4(p1x: number, p1y: number, p2x: number, p2y: number) :number
{
    return Phaser.Math.Distance.Squared(p1x, p1y, p2x, p2y);
}

export function DistanceSqRects(body1: object, body2: object) :number
{
    let left = body2.right < body1.left;
    let right = body1.right < body2.left;
    let bottom = body2.bottom < body1.top;
    let top = body1.bottom < body2.top;
    if(top && left)
        return DistanceSq4(body1.left, body1.bottom, body2.right, body2.top);
    else if(left && bottom)
        return DistanceSq4(body1.left, body1.top, body2.right, body2.bottom);
    else if(bottom && right)
        return DistanceSq4(body1.right, body1.top, body2.left, body2.bottom);
    else if(right && top)
        return DistanceSq4(body1.right, body1.bottom, body2.left, body2.top);
    else if(left)
        return (body1.left - body2.right) * (body1.left - body2.right);
    else if(right)
        return (body2.left - body1.right) * (body2.left - body1.right);
    else if(bottom)
        return (body1.top - body2.bottom) * (body1.top - body2.bottom);
    else if(top)
        return (body2.top - body1.bottom) * (body2.top - body1.bottom);
    else            
        return 0;
}