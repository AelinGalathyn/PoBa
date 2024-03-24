package com.example.poba.Fragments;

import android.os.Bundle;

import androidx.appcompat.widget.AppCompatButton;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.poba.R;
public class BejelentkezesFragment extends Fragment {
    private AppCompatButton bejelentkezes_gomb;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_bejelentkezes, container, false);

        Init(view);

        bejelentkezes_gomb.setOnClickListener(view2 ->
                Navigation.findNavController(view).navigate(R.id.action_belepesFragment_to_egyszeriBejelentkezesFragment));

        return view;
    }

    public void Init(View view) {
        bejelentkezes_gomb = view.findViewById(R.id.bejelentkezes_gomb);
    }
}