class Usuario {

        private String nome;
        private String email;
        private String senha;

        public Usuario(String nome, String email, String senha) {
            this.nome = nome;
            this.email = email;
            this.senha = senha;
        }

        public void imprimirDados() {
            System.out.println("Nome: " + nome);
            System.out.println("Email: " + email);
            System.out.println("Senha: " + senha);
        }
}

class Veiculo {

    private boolean disponivel;
    private String modelo;
    private String placa;
    private double precoPorViagem;
    private Usuario motorista;

    public Veiculo(boolean disponivel, String modelo, String placa, double precoPorViagem, Usuario motorista) {
        this.disponivel = disponivel;
        this.modelo = modelo;
        this.placa = placa;
        this.precoPorViagem = precoPorViagem;
        this.motorista = motorista;
    }

    public boolean verificarDisponibilidade() {
        return disponivel;
    }

    public double getPrecoPorViagem() {
        return precoPorViagem;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }

    public void imprimirDados() {
        System.out.println("Modelo: " + modelo);
        System.out.println("Placa: " + placa);
        System.out.println("Preco: " + precoPorViagem);
        motorista.imprimirDados();
    }
}

class ReservarViagem {

    private Veiculo veiculo;
    private Usuario passageiro;
    private String dataViagem;
    private double custo;

    public ReservarViagem(Veiculo veiculo, Usuario passageiro, String dataViagem) {
        this.veiculo = veiculo;
        this.passageiro = passageiro;
        this.dataViagem = dataViagem;
    }

    public void calcularCusto() {
        custo = veiculo.getPrecoPorViagem();
    }

    public void reservarViagem() {
        if (veiculo.verificarDisponibilidade()) {
            calcularCusto();

            System.out.println("Reserva feita");
            passageiro.imprimirDados();
            System.out.println("Data: " + dataViagem);
            System.out.println("Custo: " + custo);

            veiculo.setDisponivel(false);
        } else {
            System.out.println("Indisponivel");
        }
    }
}

public class Main {

    static Usuario[] motoristas = new Usuario[2];
    static Usuario[] passageiros = new Usuario[1];
    static Veiculo[] veiculos = new Veiculo[2];

    public static void main(String[] args) {

        motoristas[0] = new Usuario("Giovana", "gio@email.com", "123");
        motoristas[1] = new Usuario("Pedro", "pedro@email.com", "456");

        passageiros[0] = new Usuario("Ana", "ana@email.com", "789");

        veiculos[0] = new Veiculo(true, "Onix", "ABC-1234", 25.0, motoristas[0]);
        veiculos[1] = new Veiculo(false, "HB20", "XYZ-5678", 30.0, motoristas[1]);

        listarUsuarios();
        listarVeiculos();

        ReservarViagem reserva = new ReservarViagem(veiculos[0], passageiros[0], "30/03/2026");
        reserva.reservarViagem();

        listarVeiculos();
    }

    public static void listarUsuarios() {
        for (Usuario usuario : motoristas) {
            usuario.imprimirDados();
            System.out.println();
        }

        for (Usuario usuario : passageiros) {
            usuario.imprimirDados();
            System.out.println();
        }
    }

    public static void listarVeiculos() {
        for (Veiculo veiculoAtual : veiculos) {
            veiculoAtual.imprimirDados();

            if (veiculoAtual.verificarDisponibilidade()) {
                System.out.println("Disponivel");
            } else {
                System.out.println("Indisponivel");
            }

            System.out.println();
        }
    }
}