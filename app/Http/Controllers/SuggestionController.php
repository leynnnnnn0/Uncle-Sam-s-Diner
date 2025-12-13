<?php

namespace App\Http\Controllers;

use App\Models\Suggestion;
use Illuminate\Http\Request;

class SuggestionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'nullable|email',
            'suggestion' => [
                'required',
                'string',
                'min:10',
                'max:1000',
                function ($attribute, $value, $fail) {
                    if (str_word_count($value) < 3) {
                        $fail('Please provide at least 3 words in your suggestion.');
                    }

                    if (preg_match('/(.)\1{5,}/', $value)) {
                        $fail('Please provide a meaningful suggestion.');
                    }
                },
            ],
        ]);

        Suggestion::create($validated);

        return back()->with('success', 'Thank you for your feedback');
    }
}
