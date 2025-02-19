<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // Method to list all events
    public function index()
    {
        return response()->json(Event::all(), 200);
    }

    // Method to create a new event
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'artist_selected' => 'required|string|max:255',
            'fees' => 'nullable|numeric|min:0',
            'date_event' => 'required|date',
            'adress' => 'required|string|max:500',
        ]);

        $event = Event::create($validatedData);

        return response()->json([
            'message' => 'Event successfully created!',
            'data' => $event->toArray()
        ], 201);
    }
}
