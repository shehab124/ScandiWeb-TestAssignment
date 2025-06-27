<?php

namespace App\TypeDefinitions;

class TypesRegistry
{
    private static $types = [];

    public static function register(string $name, string $classname): void
    {
        self::$types[$name] = $classname;
    }

    public static function type(string $classname): \Closure
    {
        return static fn () => self::$types[$classname] ??= new $classname();
    }
}
