#!/usr/bin/perl
# Servidor web simple para el CV usando Perl
# Ejecuta: perl server.pl
# Visita: http://localhost:8000

use strict;
use warnings;
use IO::Socket::INET;
use POSIX qw(strftime);

my $PORT = 8000;
my $DOCUMENT_ROOT = ".";

print "\n";
print "=" x 60 . "\n";
print "  SERVIDOR CV WEB INICIADO (Perl)\n";
print "=" x 60 . "\n";
print "\n";
print "  URL: http://localhost:$PORT\n";
print "  Directorio: $DOCUMENT_ROOT\n";
print "  Presiona Ctrl+C para detener\n";
print "\n";
print "=" x 60 . "\n\n";

my $server = IO::Socket::INET->new(
    LocalPort => $PORT,
    Type      => SOCK_STREAM,
    Reuse     => 1,
    Listen    => 10
) or die "No se pudo iniciar el servidor: $!\n";

# MIME types
my %mime_types = (
    'html' => 'text/html',
    'css'  => 'text/css',
    'js'   => 'application/javascript',
    'png'  => 'image/png',
    'jpg'  => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'gif'  => 'image/gif',
    'svg'  => 'image/svg+xml',
    'ico'  => 'image/x-icon',
    'pdf'  => 'application/pdf'
);

while (my $client = $server->accept()) {
    $client->autoflush(1);
    
    # Leer request
    my $request = <$client>;
    next unless $request;
    
    my ($method, $path) = $request =~ /^(GET|POST)\s+(.+?)\s+HTTP/;
    next unless $method && $path;
    
    # Limpiar path
    $path =~ s/%([0-9A-Fa-f]{2})/chr(hex($1))/ge;
    $path = "/index.html" if $path eq "/";
    $path =~ s/^\///; # Quitar leading slash
    
    my $file_path = "$DOCUMENT_ROOT/$path";
    $file_path =~ s/\.\.//g; # Seguridad: evitar directory traversal
    
    my $log_time = strftime("%Y-%m-%d %H:%M:%S", localtime);
    
    if (-f $file_path && -r $file_path) {
        # Obtener extensión
        my $ext = ($file_path =~ /\.([^.]+)$/)[0] || '';
        my $mime = $mime_types{$ext} || 'application/octet-stream';
        
        # Leer archivo
        open(my $fh, '<:raw', $file_path) or do {
            send_error($client, 500, "Internal Server Error");
            next;
        };
        
        my $content = do { local $/; <$fh> };
        close($fh);
        
        # Enviar respuesta 200
        print $client "HTTP/1.1 200 OK\r\n";
        print $client "Content-Type: $mime\r\n";
        print $client "Content-Length: " . length($content) . "\r\n";
        print $client "Cache-Control: no-cache\r\n";
        print $client "Connection: close\r\n";
        print $client "\r\n";
        print $client $content;
        
        print "[$log_time] 200 OK - $path\n";
    } else {
        # Archivo no encontrado
        my $error_content = "<html><body><h1>404 Not Found</h1><p>El archivo $path no existe.</p></body></html>";
        
        print $client "HTTP/1.1 404 Not Found\r\n";
        print $client "Content-Type: text/html\r\n";
        print $client "Content-Length: " . length($error_content) . "\r\n";
        print $client "Connection: close\r\n";
        print $client "\r\n";
        print $client $error_content;
        
        print "[$log_time] 404 NOT FOUND - $path\n";
    }
    
    close($client);
}

sub send_error {
    my ($client, $code, $message) = @_;
    my $content = "<html><body><h1>$code $message</h1></body></html>";
    
    print $client "HTTP/1.1 $code $message\r\n";
    print $client "Content-Type: text/html\r\n";
    print $client "Content-Length: " . length($content) . "\r\n";
    print $client "Connection: close\r\n";
    print $client "\r\n";
    print $client $content;
}

$server->close();
