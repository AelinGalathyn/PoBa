package com.example.pobatest;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class RendelesAdapter extends RecyclerView.Adapter<RendelesAdapter.RendelesHolder> {

    private final Context context;
    private final List<Rendeles> rendelesek;

    public RendelesAdapter(Context context, List<Rendeles> rendelesek) {
        this.context = context;
        this.rendelesek = rendelesek;
    }

    public static class RendelesHolder extends RecyclerView.ViewHolder {

        TextView rendeles_szam_textView;
        ImageView futar_logo_helye;

        public RendelesHolder(@NonNull View itemView) {
            super(itemView);

            rendeles_szam_textView = itemView.findViewById(R.id.rendeles_szam_textView);
            futar_logo_helye = itemView.findViewById(R.id.futar_logo_helye);
        }
    }

    @NonNull
    @Override
    public RendelesHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.rendeles_row, parent, false);
        return new RendelesHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RendelesHolder holder, int position) {
        Rendeles rendeles = rendelesek.get(position);
        holder.rendeles_szam_textView.setText(rendeles.getOrderId());
        holder.futar_logo_helye.setImageResource(rendeles.getImage());

        holder.itemView.setOnClickListener(v -> {
            IntentAdatAtadas(rendeles);
        });
    }

    @Override
    public int getItemCount() {
        return rendelesek.size();
    }

    public void IntentAdatAtadas(Rendeles rendeles) {
        Intent intent = new Intent(context, EgyikRendelesActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        intent.putExtra("rendeles", rendeles);

        context.startActivity(intent);
    }
}

