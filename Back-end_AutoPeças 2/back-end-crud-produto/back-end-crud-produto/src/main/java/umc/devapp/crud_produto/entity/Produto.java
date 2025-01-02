package umc.devapp.crud_produto.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "produtos")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="nome")
    private String nome;
    @Column(name="descricao")
    private String descricao;
    @Column(name="categoria")
    private String categoria;
    @Column(name="fabricante")
    private String fabricante;
    @Column(name="modelo")
    private String modelo;
    @Column(name="data_fabricacao")
    private Date data_fabricacao;
    @Column(name="preco")
    private double preco;
    @Column(name="quantidade")
    private int quantidade;
    @Column(name="lote")
    private String lote;

}
