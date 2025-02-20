<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', 'http://localhost:5173') //Allows requests to be made only from the origin
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') //Defines which HTTP methods are allowed
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //Allows tokens to be sent and json's to be received
    }
}