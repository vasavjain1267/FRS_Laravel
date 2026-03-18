<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // If the user is not logged in, or their role doesn't match the required role, throw a 403 Forbidden error
        if (! $request->user() || $request->user()->role !== $role) {
            abort(403, 'Unauthorized action. You do not have the correct permissions.');
        }

        return $next($request);
    }
}