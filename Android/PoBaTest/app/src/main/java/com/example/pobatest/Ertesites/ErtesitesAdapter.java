package com.example.pobatest.Ertesites;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.pobatest.R;

import java.util.List;

public class ErtesitesAdapter extends RecyclerView.Adapter<ErtesitesAdapter.ErtesitesHolder> {
    private final Context context;
    private final List<Ertesites> ertesitesek;

    public ErtesitesAdapter(Context context, List<Ertesites> ertesitesek) {
        this.context = context;
        this.ertesitesek = ertesitesek;
    }

    public static class ErtesitesHolder extends RecyclerView.ViewHolder {
        TextView termek_nev_textView;
        public ErtesitesHolder(@NonNull View itemView) {
            super(itemView);

            termek_nev_textView = itemView.findViewById(R.id.termek_nev_textView);
        }
    }

    @NonNull
    @Override
    public ErtesitesAdapter.ErtesitesHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.ertesites_row, parent, false);
        return new ErtesitesAdapter.ErtesitesHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ErtesitesAdapter.ErtesitesHolder holder, int position) {
        Ertesites ertesites = ertesitesek.get(position);
        holder.termek_nev_textView.setText(ertesites.nev);
    }

    @Override
    public int getItemCount() {
        return ertesitesek.size();
    }
}
