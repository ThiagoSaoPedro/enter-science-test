<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nome' => 'required|string|max:255',
            'artista_selecionado' => 'required|string|max:255',
            'cache' => 'nullable|numeric|min:0',
            'data_evento' => 'required|date',
            'endereco' => 'required|string|max:500',
        ]);

        $evento = Evento::create($validatedData);

        return response()->json([
            'message' => 'Evento criado com sucesso!',
            'data' => $evento->toArray()
        ], 201);
    }

    public function index()
    {
        return response()->json(Evento::all(), 200);
    }
}
