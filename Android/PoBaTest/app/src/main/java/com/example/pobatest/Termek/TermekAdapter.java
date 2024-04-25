package com.example.pobatest.Termek;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.pobatest.R;
import com.koushikdutta.ion.Ion;

import java.util.List;

public class TermekAdapter extends RecyclerView.Adapter<TermekAdapter.TermekHolder> {

    private final Context context;
    private final List<Termek> termekek;

    public TermekAdapter(Context context, List<Termek> termekek) {
        this.context = context;
        this.termekek = termekek;
    }

    public static class TermekHolder extends RecyclerView.ViewHolder {
        TextView termek_nev_textView;
        ImageView termek_kep_helye;
        ImageView darab_icon_helye;

        public TermekHolder(@NonNull View itemView) {
            super(itemView);

            termek_nev_textView = itemView.findViewById(R.id.termek_nev_textView);
            termek_kep_helye = itemView.findViewById(R.id.termek_kep_helye);
            darab_icon_helye = itemView.findViewById(R.id.darab_icon_helye);
        }
    }

    @NonNull
    @Override
    public TermekHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.termek_row, parent, false);
        return new TermekHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull TermekHolder holder, int position) {
        Termek termek = termekek.get(position);
        holder.termek_nev_textView.setText(termek.name);

        Ion.with(context)
                .load(termek.pic_url)
                .withBitmap().intoImageView(holder.termek_kep_helye);
        holder.darab_icon_helye.setImageResource(termek.mennyiseg_img);

        holder.itemView.setOnClickListener(v -> IntentAdatAtadas(termek));
    }

    @Override
    public int getItemCount() {
        return termekek.size();
    }

    public void IntentAdatAtadas(Termek termek) {
        Intent intent = new Intent(context, EgyikTermekActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        intent.putExtra("termek", termek);

        context.startActivity(intent);
    }
}

