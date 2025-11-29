<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        // Rate limiting by IP
        $key = 'register:' . request()->ip();

        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);

            throw ValidationException::withMessages([
                'email' => 'Too many registration attempts. Please try again in ' . ceil($seconds / 60) . ' minutes.',
            ]);
        }

        Validator::make($input, [
            'username' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'business_name' => ['required', 'string']
        ])->validate();

        RateLimiter::hit($key, 3600);

        $user = User::create([
            'username' => $input['username'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        $user->business()->create([
            'name' => $input['business_name']
        ]);
        return $user;
    }
}
