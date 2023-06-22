<?php

namespace App\Http\Controllers;

use App\Models\Terms;
use Illuminate\Http\Request;

class TermsController extends Controller
{
    public function get_terms()
    {
        $data = Terms::all();
        return response()->json($data);
    }

    public function edit_terms(Request $request)
    {
        
        $terms = Terms::findOrFail(3);

        $terms->update([
            'description'   => $request->description
        ]);

        return response()->json([
            'status' => true
        ]);
    }
}
